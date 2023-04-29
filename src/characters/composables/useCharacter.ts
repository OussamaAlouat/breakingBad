import rickAndMortyApi from "@/api/rickAndMortyApi";
import { useQuery } from "@tanstack/vue-query";
import { AxiosError, isAxiosError } from "axios";
import { ref, computed } from "vue";
import type { Character } from "../interfaces/character";

const characterSet = ref<{[id: string]: Character}>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async(id: string) => {
  if (characterSet.value[id]) {
    return characterSet.value[id];
  }

  try {
    const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`);
    if(data && data.id) {
      return data
    } else {
      throw new Error(`Not foud pokemon with id ${id}`)
    }
  } catch (error: any) {
    throw new Error(error);
  }
}

const loadedCharacter = (data: Character) => {
  hasError.value = false;
  errorMessage.value = null;
  characterSet.value[data.id] = data;
}

const loadedCharacterFailed = (error: any) => {
  hasError.value = true;
  errorMessage.value = error;
}

const useCharacter = (id: string) => {
  const { isLoading } = useQuery(
    ['character', id],
    () => getCharacter(id),
    {
      onSuccess: loadedCharacter,
      onError: loadedCharacterFailed,
    }
  );
  return {
    // Properies
    isLoading,
    list: characterSet,
    hasError,
    errorMessage,

    //Getters
    character: computed<Character | null>(() => characterSet.value[id]),

    //Methods
  };
};

export default useCharacter;