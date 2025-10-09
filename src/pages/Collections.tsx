import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { useProducts } from "@/hooks/useProducts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const Collections = () => {
  const { products, filters, setFilters, sortBy, setSortBy } = useProducts();

  const clearFilter = (category: keyof typeof filters, value?: string) => {
    if (value) {
      const currentValues = filters[category] as string[];
      setFilters({ ...filters, [category]: currentValues.filter(v => v !== value) });
    } else {
      setFilters({
        priceRange: [0, 50000],
        fabricTypes: [],
        colors: [],
        occasions: [],
        regions: [],
      });
    }
  };

  const activeFiltersCount = 
    filters.fabricTypes.length + 
    filters.colors.length + 
    filters.occasions.length + 
    filters.regions.length;

  return (
    <Layout>
      <div className="container mx-auto px-6 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Collections</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">
              Our Collections
            </h1>
            <p className="text-muted-foreground">
              {products.length} {products.length === 1 ? 'saree' : 'sarees'} found
            </p>
          </div>
          
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap gap-2 items-center">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {filters.fabricTypes.map(fabric => (
              <Badge key={fabric} variant="secondary" className="gap-1">
                {fabric}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => clearFilter('fabricTypes', fabric)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {filters.colors.map(color => (
              <Badge key={color} variant="secondary" className="gap-1">
                {color}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => clearFilter('colors', color)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {filters.occasions.map(occasion => (
              <Badge key={occasion} variant="secondary" className="gap-1">
                {occasion}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => clearFilter('occasions', occasion)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            {filters.regions.map(region => (
              <Badge key={region} variant="secondary" className="gap-1">
                {region}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => clearFilter('regions', region)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={() => clearFilter('fabricTypes')}>
              Clear all
            </Button>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>
          
          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg mb-4">No sarees found matching your criteria</p>
                <Button onClick={() => clearFilter('fabricTypes')}>Clear all filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Collections;
