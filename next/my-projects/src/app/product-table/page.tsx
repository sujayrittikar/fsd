'use client'
import { useState } from 'react';


type searchBarProps = {
    filterText: string,
    inStockOnly: boolean,
    onFilterTextChange: (filterText: string) => void,
    onInStockOnlyChange: (inStockOnly: boolean) => void
};

type Product = {
    category: string,
    price: string,
    stocked: boolean,
    name: string
};

type productProps = {
    product: Product
};

type productsProps = {
    products: productProps[]
};

type productTableProps = {
    products: productProps[],
    filterText: string,
    inStockOnly: boolean
};

function ProductRow({ product }: productProps) {
  const name = product.stocked ? product.name : 
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow({ category }: {category: string}) {
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  );
}

function ProductTableHeader({ headers }: { headers: string[] }) {
    const rows = headers.map((header) => <th key={header}>{header}</th>);
    return <thead>{rows}</thead>;
  }
  

function ProductTable({ products, filterText, inStockOnly }: productTableProps) {
  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;
  
  products.forEach((product) => {

    if (
      product.product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.product.stocked) {
      return;
    }

    if (product.product.category !== lastCategory)
    {
      rows.push(<ProductCategoryRow category={product.product.category} key={product.product.category}/>);
    }

    rows.push(<ProductRow product={product.product} key={product.product.name}/>);
    lastCategory = product.product.category;
  });

  return (
    <table>
      <ProductTableHeader headers={['Name', 'Price']}/>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}: searchBarProps) {
  return (
    <form>
      <input
        type="text" placeholder="Search..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}/>
      <label>
        <input type="checkbox"
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)}/>
        {' '}
        Only show products in stock
      </label>
    </form>
  );
}

function FilterableProductTable({ products }: productsProps) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly}/>
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}/>
    </div>
  );
}

const PRODUCTS: Product[] = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

export default function App() {
    const productPropsArray: productProps[] = PRODUCTS.map((product) => ({
      product: product,
    }));
  
    return <FilterableProductTable products={productPropsArray} />;
  }
  
