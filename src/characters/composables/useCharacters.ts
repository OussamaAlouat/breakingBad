import { ref, onMounted } from "vue";
import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { Character, RickAndMorty } from "../interfaces/character";
import axios from "axios";

const characters = ref<Character[]>([]);
const isLoading = ref<boolean>(true);
const errorMessage = ref<string>('');
const hasError = ref<boolean>(false);

export const useCharacters = () => {

  onMounted(async() => {
    loadCharacters();
  });

  const loadCharacters = async () => {
    if(characters.value.length > 0) return;
    isLoading.value = true;
    try {
      const { data } = await  rickAndMortyApi.get<RickAndMorty>('/character');
      characters.value = data.results;
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      hasError.value = true;


      if(axios.isAxiosError(error) ) {
        return errorMessage.value = error.message;
      }

      errorMessage.value = JSON.stringify(error);
    }
  }

  return {
    characters,
    isLoading,
    errorMessage,
    hasError
  };
}
