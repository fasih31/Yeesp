import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  type: 'courses' | 'tutors' | 'projects';
}

export interface SearchFilters {
  query: string;
  category?: string;
  level?: string;
  priceRange?: [number, number];
  rating?: number;
  sortBy?: string;
}

export function AdvancedSearch({ onSearch, type }: AdvancedSearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    priceRange: [0, 1000],
    rating: 0,
    sortBy: 'relevance',
  });

  const categories = type === 'courses' 
    ? ['Programming', 'Design', 'Business', 'Marketing', 'Data Science', 'Personal Development']
    : type === 'tutors'
    ? ['Math', 'Science', 'Languages', 'Arts', 'Technology', 'Business']
    : ['Web Development', 'Mobile Apps', 'Design', 'Writing', 'Marketing', 'Consulting'];

  const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      query: '',
      priceRange: [0, 1000],
      rating: 0,
      sortBy: 'relevance',
    });
    onSearch({
      query: '',
      sortBy: 'relevance',
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${type}...`}
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>Search</Button>
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Active Filters */}
      {(filters.category || filters.level || filters.rating) && (
        <div className="flex gap-2 flex-wrap">
          {filters.category && (
            <Badge variant="secondary" className="gap-1">
              {filters.category}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({ ...filters, category: undefined })} />
            </Badge>
          )}
          {filters.level && (
            <Badge variant="secondary" className="gap-1">
              {filters.level}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({ ...filters, level: undefined })} />
            </Badge>
          )}
          {filters.rating && filters.rating > 0 && (
            <Badge variant="secondary" className="gap-1">
              {filters.rating}+ Stars
              <X className="h-3 w-3 cursor-pointer" onClick={() => setFilters({ ...filters, rating: 0 })} />
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Clear All
          </Button>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Level Filter */}
              {type === 'courses' && (
                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <Select value={filters.level} onValueChange={(value) => setFilters({ ...filters, level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      {levels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={filters.sortBy} onValueChange={(value) => setFilters({ ...filters, sortBy: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-2 md:col-span-2">
                <Label>Price Range: ${filters.priceRange?.[0]} - ${filters.priceRange?.[1]}</Label>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
                  className="mt-2"
                />
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <Select value={filters.rating?.toString()} onValueChange={(value) => setFilters({ ...filters, rating: parseInt(value) })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Any Rating</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="5">5 Stars Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={handleClearFilters}>
                Clear Filters
              </Button>
              <Button onClick={handleSearch}>
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
