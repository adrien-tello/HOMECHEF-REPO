import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Recipe } from "../types";

// ✅ Paginated recipe loader
export const getRecipes = async (
  pageSize: number,
  lastDoc: any = null
): Promise<{
  recipes: Recipe[];
  lastDoc: any;
  isEnd: boolean;
}> => {
  try {
    const recipesRef = collection(db, "recipes");
    let recipesQuery = query(recipesRef, orderBy("name"), limit(pageSize));

    if (lastDoc) {
      recipesQuery = query(
        recipesRef,
        orderBy("name"),
        startAfter(lastDoc),
        limit(pageSize)
      );
    }

    const snapshot = await getDocs(recipesQuery);

    const recipes: Recipe[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];

    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    const isEnd = snapshot.empty || snapshot.docs.length < pageSize;

    return {
      recipes,
      lastDoc: lastVisible,
      isEnd,
    };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return {
      recipes: [],
      lastDoc: null,
      isEnd: true,
    };
  }
};

// 🔍 Search recipes by name, region, or difficulty with optional filters
export const searchRecipes = async (
  searchTerm: string,
  regionFilter?: string,
  difficultyFilter?: string
): Promise<Recipe[]> => {
  try {
    const snapshot = await getDocs(collection(db, "recipes"));
    const allRecipes: Recipe[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Recipe[];

    const term = searchTerm.toLowerCase();

    // ✅ Fuzzy string matching (basic for now)
    let filtered = allRecipes.filter((recipe) => {
      const name = recipe.name?.toLowerCase() || "";
      const region = recipe.region?.toLowerCase() || "";
      const difficulty = recipe.difficulty?.toLowerCase() || "";

      return (
        name.includes(term) ||
        region.includes(term) ||
        difficulty.includes(term)
      );
    });

    // ✅ Apply optional filters (exact match)
    if (regionFilter) {
      filtered = filtered.filter((recipe) => recipe.region === regionFilter);
    }
    if (difficultyFilter) {
      filtered = filtered.filter((recipe) => recipe.difficulty === difficultyFilter);
    }

    return filtered;
  } catch (error) {
    console.error("Error searching recipes:", error);
    return [];
  }
};
