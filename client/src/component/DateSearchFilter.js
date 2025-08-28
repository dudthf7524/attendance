import { useState } from "react";
import { CalendarDaysIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const DateSearchFilter = ({ onDateChange, onSearch, className = "" }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleStartDateChange = (e) => {
        const newStartDate = e.target.value;
        setStartDate(newStartDate);
    };

    const handleEndDateChange = (e) => {
        const newEndDate = e.target.value;
        setEndDate(newEndDate);
    };

    const handleSearch = () => {
        const dateRange = {
            startDate: startDate,
            endDate: endDate
        };

        if (onDateChange) {
            onDateChange(dateRange);
        }

        if (onSearch) {
            onSearch(dateRange);
        }
    };

    const clearDates = () => {
        setStartDate("");
        setEndDate("");
        const emptyDateRange = {
            startDate: "",
            endDate: ""
        };

        if (onDateChange) {
            onDateChange(emptyDateRange);
        }

        if (onSearch) {
            onSearch(emptyDateRange);
        }
    };

    return (
        <div className={`rounded-xl p-6 border border-gray-200 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <CalendarDaysIcon className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">날짜 검색</h3>
                </div>
                <button
                    onClick={clearDates}
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                    <XMarkIcon className="w-4 h-4" />
                    <span>초기화</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
                        시작일
                    </label>
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
                        종료일
                    </label>
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        min={startDate}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex">
                <button
                    onClick={handleSearch}
                    className="flex border border-gray-300 bg-white items-center justify-center space-x-2 px-8 py-3 font-semibold rounded-lg hover:bg-gray-50 w-full"
                >
                    <MagnifyingGlassIcon className="w-5 h-5" />
                    <span>검색</span>
                </button>
            </div>
        </div>
    );
};

export default DateSearchFilter;