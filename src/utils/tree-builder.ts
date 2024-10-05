// src/utils/tree-builder.ts

export const buildTreeStructure = (items, parent = null) => {
  const tree = [];

  items
    .filter((item) =>
      item.parent ? item.parent.id === parent : parent === null
    )
    .forEach((item) => {
      const children = buildTreeStructure(items, item.id);
      if (children.length) {
        item.children = children;
      }
      tree.push(item);
    });

  return tree;
};
