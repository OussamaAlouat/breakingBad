import { reactive } from "vue";
import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { Character, RickAndMorty } from "@/characters/interfaces/character";

interface Store {
  characters: {
    list: Character[];
    count: number;
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
  },

  // Methods
  startLoadingCharacters: () => void;
  loadedCharacters: ( data: Character[]) => void;
  loadedCharactersFailed: ( error: string) => void;
}

// Initial state
const characterStore = reactive<Store>({
  characters: {
    count: 0,
    list: [],
    errorMessage: null,
    hasError: false,
    isLoading: true,
  },

  // Methods
  async startLoadingCharacters() {
    const { data } = await rickAndMortyApi.get<RickAndMorty>('/character');
    this.loadedCharacters(data.results);
  },

  loadedCharacters(data) {
    this.characters = {
      count: data.length,
      list: [...data],
      isLoading: false,
      hasError: false,
      errorMessage: null
    };
  },

  loadedCharactersFailed(error) {

  }


});


export default characterStore;