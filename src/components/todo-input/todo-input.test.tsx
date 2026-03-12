import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { TodoInput } from ".";

const mockAddTask = jest.fn();

jest.mock("@/contexts/TodoContext", () => ({
  useTodo: () => ({
    addTask: mockAddTask,
  }),
}));

describe("TodoInput", () => {
  beforeEach(() => {
    mockAddTask.mockClear();
  });

  it("deve mostrar erro ao tentar adicionar tarefa vazia", async () => {
    const { getByText, findByText } = render(<TodoInput />);

    fireEvent.press(getByText("Adicionar"));

    const errorMessage = await findByText("Digite uma tarefa");

    expect(errorMessage).toBeTruthy();
  });

  it("deve adicionar uma tarefa válida", async () => {
    const { getByPlaceholderText, getByText } = render(<TodoInput />);

    const input = getByPlaceholderText("Adicione uma nova tarefa");

    fireEvent.changeText(input, "Adicionar testes ao aplicativo");
    fireEvent.press(getByText("Adicionar"));

    await waitFor(() => {
      expect(mockAddTask).toHaveBeenCalledWith("Adicionar testes ao aplicativo");
    });
  })
});