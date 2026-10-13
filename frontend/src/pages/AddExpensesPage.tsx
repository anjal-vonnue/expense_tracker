import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddExpensesPage = () => {
  const categories = [
    { label: "Food", value: "food" },
    { label: "Transport", value: "transport" },
    { label: "Shopping", value: "shopping" },
    { label: "Bills", value: "bills" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Others", value: "others" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <form className="w-full max-w-sm">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="form-name">Title</FieldLabel>
              <Input
                id="form-name"
                type="text"
                placeholder="Bought Bananas"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="form-email">Amount</FieldLabel>
              <Input id="form-email" type="text" placeholder="₹480" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="form-country">Category</FieldLabel>
                <Select items={categories} defaultValue="us">
                  <SelectTrigger id="form-country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
                <Input
                  id="form-phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="form-address">Address</FieldLabel>
              <Input id="form-address" type="text" placeholder="123 Main St" />
            </Field>
            <Field orientation="horizontal">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default AddExpensesPage;
