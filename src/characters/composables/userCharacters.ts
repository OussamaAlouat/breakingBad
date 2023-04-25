import { computed, ref } from "vue";
import type { Character, RickAndMorty } from '@/characters/interfaces/character';
import rickAndMortyApi from "@/api/rickAndMortyApi";
import { useQuery } from "@tanstack/vue-query";
import { isAxiosError } from "axios";

const characters = ref<Character[]>([]);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async (): Promise<Character[]> => {
  if (characters.value.length > 0) {
    return characters.value;
  }

  const { data } = await rickAndMortyApi.get<RickAndMorty>('/character');
  return data.results;
}

const loadedCharacters = (data: Character[]) => {
  hasError.value = false;
  errorMessage.value = null;
  characters.value = data;
}

const loadedCharactersFailed = (error: string) => {
  hasError.value = true;
  errorMessage.value = error;
  characters.value = [];
}

const useCharacters = () => {

  const { isLoading, } =useQuery(
    ['characters'],
    getCharacters,
    {
      onSuccess: loadedCharacters,
      onError(error) {
        if (isAxiosError(error)) {
          loadedCharactersFailed(error.message);
        } else {
          loadedCharactersFailed(JSON.stringify(error));
        }
      }
    }
  );


  return {
    // Properties
    characters,
    hasError,
    errorMessage,
    isLoading,

    // Getters
    count: computed(() =>  characters.value.length),

    // Methods
  }
};


export default useCharacters;