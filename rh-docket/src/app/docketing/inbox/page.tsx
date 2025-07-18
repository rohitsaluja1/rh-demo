'use client';

import React, { useEffect } from 'react';
import { Upload, Filter, Download, List, Grid3X3 } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { InboxTable } from '@/components/InboxTable';
import { SearchBar } from '@/components/SearchBar';
import { StatusPill } from '@/components/StatusPill';
import { useInboxStore, InboxItem } from '@/store/inboxStore';
import inboxData from '@/mock/inbox.json';

export default function InboxPage() {
  const { 
    setItems, 
    summaryStats, 
    statusFilter, 
    setStatusFilter, 
    viewMode, 
    setViewMode 
  } = useInboxStore();

  useEffect(() => {
    // Load mock data with proper typing
    setItems(inboxData as InboxItem[]);
  }, [setItems]);

  const stats = summaryStats();

  const handleUploadDocuments = () => {
    console.log('Upload documents clicked');
  };

  const handleIntegrations = () => {
    console.log('Integrations clicked');
  };

  const handleAdvancedFilters = () => {
    console.log('Advanced filters clicked');
  };

  const handleFilter = () => {
    console.log('Filter clicked');
  };

  const handleDownload = () => {
    console.log('Download clicked');
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Breadcrumbs */}
        <nav className="flex mb-4" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                All clients
              </span>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
                  Docketing
                </span>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm font-medium text-gray-900">
                  Inbox
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleIntegrations}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Integrations
            </button>
            <button
              onClick={handleUploadDocuments}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload documents
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 max-w-md">
              <SearchBar placeholder="Search messages" />
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleAdvancedFilters}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced filters
              </button>
              <button
                onClick={handleFilter}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Download className="h-4 w-4" />
              </button>
              <div className="flex items-center bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('card')}
                  className={`p-2 rounded ${
                    viewMode === 'card' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Summary Pills */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Total:</span>
              <span className="text-sm text-gray-900">{stats.total}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Matched:</span>
              <StatusPill status="Matched" />
              <span className="text-sm text-gray-900">{stats.matched}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Unmatched:</span>
              <StatusPill status="Unmatched" />
              <span className="text-sm text-gray-900">{stats.unmatched}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Partial match:</span>
              <StatusPill status="Partial" />
              <span className="text-sm text-gray-900">{stats.partial}</span>
            </div>
          </div>

          {/* Status Filter */}
          <div className="mt-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Matched">Matched</option>
              <option value="Unmatched">Unmatched</option>
              <option value="Partial">Partial</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <InboxTable />
        </div>
      </div>
    </Layout>
  );
}