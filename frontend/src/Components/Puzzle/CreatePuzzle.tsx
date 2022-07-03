import {
  Box,
  Button,
  Form,
  FormExtendedEvent,
  FormField,
  Heading,
  RadioButtonGroup,
  Select,
  TextArea,
  TextInput,
} from "grommet";
import { IPuzzle, PuzzleCondition } from "Types/Puzzle";

import React from "react";
import { createPuzzle } from "Api/puzzles/createPuzzle";
import { getUser } from "State/User/userActions";
import { useSelector } from "react-redux";

export const CreatePuzzle = () => {
  const { user } = useSelector(getUser);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [count, setCount] = React.useState(1000);
  const [missingPieces, setMissingPieces] = React.useState(false);
  const [puzzleCondition, setPuzzleCondition] = React.useState(
    PuzzleCondition.Good
  );

  const onChangeString =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setter(event.target.value);

  const onChangeNumber =
    (setter: React.Dispatch<React.SetStateAction<number>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setter(parseFloat(event.target.value));

  const onSubmit = async ({
    value: { name, description, count, missingPieces, puzzleCondition },
  }: FormExtendedEvent<{
    name: string;
    description: string;
    count: number;
    missingPieces: boolean;
    puzzleCondition: PuzzleCondition;
  }>) => {
    try {
      const puzzle: Partial<IPuzzle> = {
        name,
        description,
        count,
        missingPieces,
        puzzleCondition,
        owner_id: user.id,
      };

      await createPuzzle(puzzle);
    } catch (e: any) {
      console.log(e.response.data.message);
    }
  };
  

  return (
    <Box fill align="center" justify="start" margin={{ top: "large" }}>
      <Heading size="medium">Add a puzzle!</Heading>
      <Box width="large">
        <Form onReset={() => {}} onSubmit={onSubmit}>
          <FormField label="Name" name="name" required>
            <TextInput
              name="name"
              value={name}
              onChange={onChangeString(setName)}
            />
          </FormField>

          <FormField name="description" label="Description">
            <TextArea
              name="description"
              placeholder="Describe the puzzle!"
              resize={false}
              value={description}
              onChange={onChangeString(setDescription)}
            />
          </FormField>

          <FormField label="Count" name="count" required>
            <TextInput
              type="number"
              name="count"
              value={count}
              onChange={onChangeNumber(setCount)}
            />
          </FormField>

          <FormField
            label="Missing Pieces"
            name="radio"
            required
            style={{ flexDirection: "row" }}
            contentProps={{ border: false }}
          >
            <RadioButtonGroup
              name="radio"
              style={{ flexDirection: "row", width: "300px", justifyContent: "space-around", border: "none" }}
              options={[
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ]}
              value={missingPieces ? "yes" : "no"}
              onChange={(event) =>
                setMissingPieces(event.target.value === "yes")
              }
            />
          </FormField>

          <FormField label="Condition" name="select" required>
            <Select
              name="select"
              placeholder="Puzzle condition"
              options={Object.values(PuzzleCondition)}
              value={puzzleCondition}
              onChange={(event) => {
                console.log(event.target.value);
                setPuzzleCondition(
                  PuzzleCondition[event.target.value as PuzzleCondition]
                )
              }
              }
            />
          </FormField>

          <Box direction="row" justify="between" margin={{ top: "medium" }}>
            <Button type="submit" label="Submit" primary />
            <Button type="reset" label="Cancel" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
