const instructionSources = import.meta.glob("../../ai/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export const aiInstructionFiles = Object.entries(instructionSources).map(([sourcePath, content]) => ({
  content,
  path: sourcePath.replace("../../", ""),
}));

export const aiInstructionTree = aiInstructionFiles.reduce(
  (root, file) => {
    const parts = file.path.split("/").slice(1);
    let current = root;

    parts.forEach((part, index) => {
      let child = current.children.find((node) => node.name === part);

      if (!child) {
        child = { name: part, children: [], file: index === parts.length - 1 ? file : null };
        current.children.push(child);
      }

      current = child;
    });

    return root;
  },
  { name: "ai", children: [], file: null },
);
