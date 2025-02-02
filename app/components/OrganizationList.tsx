'use client';
import React, { useState } from 'react';
import organizationsData from '../api/data/2024.json';
import ReactPaginate from 'react-paginate';
import Fuse from 'fuse.js';

const OrganizationList = () => {
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = new Fuse(organizationsData.organizations, {
    keys: ['name', 'category', 'technologies'],
    includeMatches: true,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredOrganizations =
    searchQuery === ''
      ? organizationsData.organizations
      : fuse.search(searchQuery).map((result) => result.item);

  const pageCount = Math.ceil(filteredOrganizations.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = (currentPage + 1) * itemsPerPage;
  const displayedOrganizations = filteredOrganizations.slice(startIndex, endIndex);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="antialiased text-slate-300 dark:text-slate-200 bg-slate-900 dark:bg-slate-900 pt-10" id="explore-projects">
      <div className="flex justify-center sm:text-6xl md:text-6xl lg:text-6xl mb-10 ">
        <h1>Find Projects</h1>
      </div>
      <div className="mb-10 flex justify-center">
        <input
          type="text"
          placeholder="Search Projects"
          value={searchQuery}
          onChange={handleSearch}
          className="px-6 py-2 rounded-md bg-slate-700  text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/3"
        />
      </div>
      <div className="grid max-w-[26rem] sm:max-w-[52.5rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto gap-10 lg:gap-y-10 xl:gap-x-8 lg:max-w-7xl px-4 sm:px-6 lg:px-8">
        {displayedOrganizations.map((org) => (
            <div
            key={org.name}
            className="group relative rounded-xl bg-slate-800/80 dark:bg-slate-700/80 p-6 hover:scale-105"
          >
            <div className="aspect-[672/494] relative rounded-md transform overflow-hidden shadow-[0_2px_8px_rgba(15,23,42,0.08)] bg-slate-700 dark:bg-slate-600">
                <img
                  src={org.image_url}
                  alt={org.name}
                  width="672"
                  height="494"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <h2 className="text-xl font-bold mb-2 mt-2">{org.name}</h2>
              <p className="text-slate-400 mb-2">{org.description}</p>
              <div className="bg-orange-500 dark:bg-orange-500 rounded-full px-3 py-1 mb-4 text-center">
                <span className="text-sm">{org.category}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-5 justify-center">
                {org.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-yellow-500 dark:bg-yellow-500 text-slate-800 dark:text-slate-800 rounded-full px-2 py-1 text-sm "
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-center">
                <a
                  href={org.guide_url || undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Visit Github
                </a>
              </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"flex pagination gap-10 mt-20 mb-20"}
          previousLinkClassName={
            "border py-2 px-3 rounded-full mr-2 hover:bg-slate-800/80 dark:hover:bg-slate-700/80"
          }
          nextLinkClassName={
            "border py-2 px-3 rounded-full ml-2 hover:bg-slate-800/80 dark:hover:bg-slate-700/80"
          }
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active bg-green-600 px-5 rounded-full"}
        />
      </div>
    </div>
  );
};

export default OrganizationList;