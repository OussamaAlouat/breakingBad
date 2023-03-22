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

  ids: {
    isLoading: boolean;
    hasError: boolean;
    errorMessage: string | null;
    list: {
      [id: string]: Character;
    }
  }

  // Methods of characters
  startLoadingCharacters: () => void;
  loadedCharacters: (data: Character[]) => void;
  loadedCharactersFailed: (error: string) => void;

  // Methods of characters by ids
  startLoadingCharacter: () => void;
  loadedCharacter: (data: Character) => void;
  loadedCharacterFailed: (error: string) => void;
  checkIdInStore: (id: string) => boolean;
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
  ids: {
    list: {},
    isLoading: false,
    hasError: false,
    errorMessage: null
  },

  // Methods of characters
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
    this.characters = {
      hasError: true,
      isLoading: false,
      count: 0,
      list: [],
      errorMessage: error,
    };
  },
  // Methods of characters by ids
  startLoadingCharacter: function (): void {
    this.ids = {
      ...this.ids,
      isLoading: true,
      hasError: false,
      errorMessage: null
    };
  },
  loadedCharacter: function (data: Character): void {
    this.ids.isLoading = false;
    this.ids.list[data.id] = data;
  },
  checkIdInStore: function (id: string): boolean {
    return !!this.ids.list[id];
  },
  loadedCharacterFailed(error): void  {
    this.ids = {
      ...this.ids,
      errorMessage: error,
      hasError: true
    }
  }
});

export default characterStore;