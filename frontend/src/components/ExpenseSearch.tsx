import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./ui/select";
import { SelectValue } from "react-aria-components";

type Props = {
  onSubmit: (search: string, category: string) => void;
};

export default function ExpenseSearch({ onSubmit }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Bills", value: "bills" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Others", value: "others" },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(search, category);
      }}
    >
      <FieldGroup className="flex flex-row ">
        <Field>
          <FieldLabel htmlFor="input-demo-api-key">Search</FieldLabel>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search expenses"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="expense-category">Category</FieldLabel>

          <Select
            placeholder="Select a category"
            aria-label="category selection"
            id="expense-category"
            className="w-full"
            value={category}
            onChange={(value) => {
              if (typeof value === "string") {
                setCategory(value);
              }
            }}
          >
            <SelectTrigger className="w-full bg-background text-foreground border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map((item) => (
                  <SelectItem key={item.value} id={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field orientation="horizontal" className="items-end w-fit">
          <Button type="submit">Submit</Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setSearch("");
              setCategory("");
              onSubmit("", "");
            }}
          >
            Reset
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
