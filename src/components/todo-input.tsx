import { useTodo } from "@/contexts/TodoContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

const inputSchema = yup.object({
  task: yup
    .string()
    .required("Digite uma tarefa")
    .min(3, "A tarefa precisa ter pelo menos 3 caracteres")
    .max(100, "Máximo de 100 caracteres")
});

type FormData = {
  task: string;
}

export function TodoInput() {
  const { addTask } = useTodo();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(inputSchema),
    mode: "onSubmit",
    reValidateMode: "onChange"
  });

  async function handleAddTask(data: FormData) {
    try {
      await addTask(data.task.trim());
      reset();
    } catch (e) {
      Alert.alert("Erro", "Não foi possível adicionar a tarefa, por favor, tente novamente!");
    }
  }

  return (
    <View className="gap-2 mb-6">
      <View className="flex-row items-center gap-2 ">
        <Controller
          control={control}
          name="task"
          render={({ field: { onChange, value } }) => (
            <TextInput
              className={`flex-1 bg-neutral-100 rounded-lg px-4 h-14 text-base text-neutral-900 border border-neutral-300 ${errors.task ? "border-red-500" : "border-neutral-300"
                }`}
              placeholder="Adicione uma nova tarefa"
              placeholderTextColor="#808080"
              value={value}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(handleAddTask)}
            />
          )}
        />



        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-green-700 flex-row px-4 h-14 rounded-lg items-center justify-center"
          onPress={handleSubmit(handleAddTask)}
        >
          <Text className="text-white font-bold">Adicionar</Text>
        </TouchableOpacity>

      </View>
      <View className="">
        {errors.task && (
          <Text className="text-red-500 text-sm">
            {errors.task.message}
          </Text>
        )}
      </View>
    </View>
  );
}