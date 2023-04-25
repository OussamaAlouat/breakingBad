import rickAndMortyApi from "@/api/rickAndMortyApi";
import { useQuery } from "@tanstack/vue-query";
import { isAxiosError } from "axios";
import { ref, computed } from "vue";
import type { Character } from "../interfaces/character";

const characterSet = ref<{[id: string]: Character}>({});
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacter = async(id: string) => {
  if (characterSet.value[id]) {
    return characterSet.value[id];
  }

  const { data } = await rickAndMortyApi.get<Character>(`/character/${id}`);
  console.log(data)
  return data;
}

const loadedCharacter = (data: Character) => {
  hasError.value = false;
  errorMessage.value = null;

  characterSet.value[data.id] = data;
}

const loadedCharacterFailed = (error: string) => {
  hasError.value = true;
  errorMessage.value = error;
}


const useCharacter = (id: string) => {
  console.log('iME HGERE', id)
  const { isLoading } = useQuery(
    ['character', id],
    () => getCharacter(id),
    {
      onSuccess: loadedCharacter,
      onError(error) {
        if (isAxiosError(error)) {
          loadedCharacterFailed(error.message);
        } else {
          loadedCharacterFailed(JSON.stringify(error));
        }
      }
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