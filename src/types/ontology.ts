export const ontologyMap: Record<string, string[]> = {
  soup: ["pepper soup", "okra soup", "mbongo tchobi"],
  stew: ["tomato stew", "egusi stew"],
  fufu: ["cassava", "yam", "plantain"],
  vegan: ["vegetarian", "plant-based", "meatless"]
};

export const expandSearchTerm = (term: string): string[] => {
  const lowerTerm = term.toLowerCase();
  const expansions = ontologyMap[lowerTerm] || [];
  return [term, ...expansions];
};
