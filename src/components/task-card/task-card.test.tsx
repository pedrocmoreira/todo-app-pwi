import { fireEvent, render } from "@testing-library/react-native";

import { TaskCard } from ".";

const mockToggleTask = jest.fn();
const mockDeleteTask = jest.fn();

jest.mock("@/contexts/TodoContext", () => ({
  useTodo: () => ({
    toggleTask: mockToggleTask,
    deleteTask: mockDeleteTask,
  }),
}));

describe("TaskCard", () => {
  const taskMock = {
    id: 1,
    task: "Adicionar melhorias de UI ao app",
    completed: 0,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("deve chamar toggleTask ao clicar no checkbox", () => {
    const { getByTestId } = render(<TaskCard task={taskMock} />);

    const checkbox = getByTestId("toggle-task-button");

    fireEvent.press(checkbox);

    expect(mockToggleTask).toHaveBeenCalledWith(taskMock);
  });

  it("deve chamar deleteTask ao clicar no botão de deletar", () => {
    const { getByTestId } = render(<TaskCard task={taskMock} />);

    const deleteButton = getByTestId("delete-task-button");

    fireEvent.press(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(taskMock.id);
  });
});