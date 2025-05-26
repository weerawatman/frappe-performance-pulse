
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Filter, X, Search, Download, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ReportFilters } from '@/types/reports';

interface ReportFiltersPanelProps {
  filters: ReportFilters;
  onFiltersChange: (filters: ReportFilters) => void;
  availableDepartments: string[];
  availablePositions: string[];
  availableCycles: { id: string; name: string; }[];
  onExportPDF: () => void;
  onExportExcel: () => void;
}

const ReportFiltersPanel: React.FC<ReportFiltersPanelProps> = ({
  filters,
  onFiltersChange,
  availableDepartments,
  availablePositions,
  availableCycles,
  onExportPDF,
  onExportExcel
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>(filters.departments || []);
  const [selectedPositions, setSelectedPositions] = useState<string[]>(filters.positions || []);
  const [selectedCycles, setSelectedCycles] = useState<string[]>(filters.cycles || []);
  const [dateRange, setDateRange] = useState<{ startDate?: Date; endDate?: Date }>(
    filters.dateRange || {}
  );

  const handleDepartmentToggle = (department: string) => {
    const updated = selectedDepartments.includes(department)
      ? selectedDepartments.filter(d => d !== department)
      : [...selectedDepartments, department];
    
    setSelectedDepartments(updated);
    onFiltersChange({
      ...filters,
      departments: updated.length > 0 ? updated : undefined
    });
  };

  const handlePositionToggle = (position: string) => {
    const updated = selectedPositions.includes(position)
      ? selectedPositions.filter(p => p !== position)
      : [...selectedPositions, position];
    
    setSelectedPositions(updated);
    onFiltersChange({
      ...filters,
      positions: updated.length > 0 ? updated : undefined
    });
  };

  const handleCycleToggle = (cycleId: string) => {
    const updated = selectedCycles.includes(cycleId)
      ? selectedCycles.filter(c => c !== cycleId)
      : [...selectedCycles, cycleId];
    
    setSelectedCycles(updated);
    onFiltersChange({
      ...filters,
      cycles: updated.length > 0 ? updated : undefined
    });
  };

  const handleDateRangeChange = (field: 'startDate' | 'endDate', date?: Date) => {
    const updated = { ...dateRange, [field]: date };
    setDateRange(updated);
    onFiltersChange({
      ...filters,
      dateRange: updated.startDate || updated.endDate ? updated : undefined
    });
  };

  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedPositions([]);
    setSelectedCycles([]);
    setDateRange({});
    setSearchTerm('');
    onFiltersChange({});
  };

  const hasActiveFilters = selectedDepartments.length > 0 || 
                          selectedPositions.length > 0 || 
                          selectedCycles.length > 0 || 
                          dateRange.startDate || 
                          dateRange.endDate;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            ตัวกรองรายงาน
          </CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportPDF}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onExportExcel}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Excel
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label>ค้นหาพนักงาน</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="ค้นหาด้วยชื่อพนักงาน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Departments Filter */}
        <div className="space-y-2">
          <Label>แผนก</Label>
          <Select onValueChange={handleDepartmentToggle}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกแผนก" />
            </SelectTrigger>
            <SelectContent>
              {availableDepartments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedDepartments.map((dept) => (
              <Badge key={dept} variant="secondary" className="flex items-center gap-1">
                {dept}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handleDepartmentToggle(dept)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Positions Filter */}
        <div className="space-y-2">
          <Label>ตำแหน่ง</Label>
          <Select onValueChange={handlePositionToggle}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกตำแหน่ง" />
            </SelectTrigger>
            <SelectContent>
              {availablePositions.map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedPositions.map((pos) => (
              <Badge key={pos} variant="secondary" className="flex items-center gap-1">
                {pos}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => handlePositionToggle(pos)}
                />
              </Badge>
            ))}
          </div>
        </div>

        {/* Cycles Filter */}
        <div className="space-y-2">
          <Label>รอบการประเมิน</Label>
          <Select onValueChange={handleCycleToggle}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกรอบการประเมิน" />
            </SelectTrigger>
            <SelectContent>
              {availableCycles.map((cycle) => (
                <SelectItem key={cycle.id} value={cycle.id}>
                  {cycle.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCycles.map((cycleId) => {
              const cycle = availableCycles.find(c => c.id === cycleId);
              return cycle ? (
                <Badge key={cycleId} variant="secondary" className="flex items-center gap-1">
                  {cycle.name}
                  <X 
                    className="w-3 h-3 cursor-pointer" 
                    onClick={() => handleCycleToggle(cycleId)}
                  />
                </Badge>
              ) : null;
            })}
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-2">
          <Label>ช่วงเวลา</Label>
          <div className="grid grid-cols-2 gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.startDate ? format(dateRange.startDate, "dd/MM/yyyy") : "วันที่เริ่มต้น"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.startDate}
                  onSelect={(date) => handleDateRangeChange('startDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.endDate ? format(dateRange.endDate, "dd/MM/yyyy") : "วันที่สิ้นสุด"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dateRange.endDate}
                  onSelect={(date) => handleDateRangeChange('endDate', date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            onClick={clearAllFilters}
            className="w-full"
          >
            ล้างตัวกรองทั้งหมด
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportFiltersPanel;
