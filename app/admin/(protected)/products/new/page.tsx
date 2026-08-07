import ProductForm from "../../../_components/ProductForm";
import { PageHeader } from "../../../_components/ui";

export default function NewProductPage() {
  return (
    <div>
      <PageHeader title="New Product" />
      <ProductForm />
    </div>
  );
}
