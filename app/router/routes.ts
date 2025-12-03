export const routes = {
  home: "/blog",
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
    resetPassword: "/reset-password",
    createPassword: "/create-password",
    forgotPassword: "/forgot-password",
    changePassword: "/change-password",
  },
  errors: { notFound: "/errors/not-found" },
  dashboard: "/dashboard",

  fileBaseRouting: "/file-base-routing",
  layoutStructure: "/layout",
  middlewareStructure: "/middleware",
  renderingStructure: "/rendering",
  user: {
    listing: "/user",
    create: "/user/create",
    edit: (id: string) => `/user/edit/${id}`,
    detail: (id: string) => `/user/${id}`,
  },
  blogs: {
    listing: "/blog",
    create: "/blog/create",
    edit: (id: string) => `/blog/edit/${id}`,
    detail: (id: string) => `blog/${id}`,
  },
};
