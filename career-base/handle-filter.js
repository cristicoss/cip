const _handleFilters = function (filters, allJobs) {
  const { dept, exp, country } = filters;
  return allJobs.filter((job) => {
    // 1) Department
    if (dept && dept !== "All Departments") {
      if (job.department.id != dept) return false;
    }

    // 2) Experience
    if (exp && exp !== "Experience") {
      if (!job.customField[7].valueLabel.includes(exp)) return false;
    }

    // 3) Country
    if (country && country !== "Country") {
      if (!job.location.country.includes(country)) return false;
    }

    return true;
  });
};

const _handleFiltersBA = function (filters, allJobs) {
  // makes a new array with jobs and renames the client filed to deptLabel
  const newJobs = allJobs
    .filter((job) => job.customField?.[9]?.valueLabel)
    .map((job) => ({
      ...job,
      deptLabel: job.customField[9].valueLabel,
    }));

  const { dept, exp, country } = filters;

  return newJobs.filter((job) => {
    // 1) Department
    if (dept && dept !== "All Departments") {
      if (job.deptLabel != dept) return false;
    }

    // 2) Experience
    if (exp && exp !== "Experience") {
      if (!job.customField[7].valueLabel.includes(exp)) return false;
    }

    // 3) Country
    if (country && country !== "Country") {
      if (!job.location.country.includes(country)) return false;
    }

    return true;
  });
};

export { _handleFilters, _handleFiltersBA };
