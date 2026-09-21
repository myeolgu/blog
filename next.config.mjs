const basePath = process.env.GITHUB_ACTIONS ? "/blog" : "";

export default {
  output: "export",
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
