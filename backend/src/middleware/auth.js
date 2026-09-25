const getBearerToken = (request) => {
  const authorization = request.get("authorization") || "";
  const [scheme, token] = authorization.trim().split(/\s+/, 2);
  return scheme?.toLowerCase() === "bearer" && token ? token : null;
};

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "anupdcodes@gmail.com")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

const isAdminEmail = (email) =>
  Boolean(email && ADMIN_EMAILS.includes(email.toLowerCase()));

const ensureProfileForUser = async (supabaseClient, user) => {
  if (!supabaseClient || !user?.id) {
    return null;
  }

  const { data: profile, error } = await supabaseClient
    .from("profiles")
    .select("id, name, email, role")
    .eq("id", user.id)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    throw error;
  }

  if (profile) {
    const normalizedRole = profile.role ?? "user";
    const effectiveRole = isAdminEmail(user.email) ? "admin" : normalizedRole;

    if (effectiveRole !== profile.role) {
      const { data: updatedProfile, error: updateError } = await supabaseClient
        .from("profiles")
        .update({ role: effectiveRole })
        .eq("id", user.id)
        .select("id, name, email, role")
        .single();

      if (updateError) {
        throw updateError;
      }

      return updatedProfile;
    }

    return profile;
  }

  const fallbackName =
    user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

  const fallbackRole = isAdminEmail(user.email) ? "admin" : "user";

  const { data: createdProfile, error: insertError } = await supabaseClient
    .from("profiles")
    .insert({
      id: user.id,
      name: fallbackName,
      email: user.email,
      role: fallbackRole,
    })
    .select("id, name, email, role")
    .single();

  if (insertError) {
    throw insertError;
  }

  return createdProfile;
};

export const createAuthMiddleware = (supabase) => {
  const requireAuth = async (request, response, next) => {
    if (!supabase) {
      return response
        .status(503)
        .json({ error: "Supabase is not configured." });
    }

    const token = getBearerToken(request);
    if (!token) {
      return response.status(401).json({ error: "Authentication required." });
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      console.warn("AUTH TOKEN REJECTED", {
        path: request.path,
        error: error?.message,
      });
      return response.status(401).json({ error: "Invalid or expired token." });
    }

    request.user = data.user;
    console.log("AUTH USER", {
      path: request.path,
      id: data.user.id,
      email: data.user.email,
    });
    return next();
  };

  const requireAdmin = async (request, response, next) => {
    return requireAuth(request, response, async () => {
      try {
        const profile = await ensureProfileForUser(supabase, request.user);

        console.log("PROFILE", {
          path: request.path,
          userId: request.user.id,
          id: profile?.id,
          email: profile?.email,
          role: profile?.role,
        });

        if (!profile || profile.role !== "admin") {
          return response.status(403).json({ error: "Admin access required." });
        }

        request.profile = profile;
        return next();
      } catch (error) {
        console.error("PROFILE ERROR", {
          path: request.path,
          userId: request.user.id,
          error,
        });
        return response
          .status(500)
          .json({ error: "Unable to verify admin access." });
      }
    });
  };

  return { requireAuth, requireAdmin };
};
