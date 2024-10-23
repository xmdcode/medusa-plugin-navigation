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

export const filterOutTimestamps = (entity: any): any => {
  const { created_at, updated_at, ...rest } = entity;

  // Recursively process items if they exist (for nested structures)
  if (rest.items && Array.isArray(rest.items)) {
    rest.items = rest.items.map(filterOutTimestamps);
  }

  return rest;
};
