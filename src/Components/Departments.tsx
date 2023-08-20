import React, { useState } from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Department = {
  department: string;
  sub_departments: string[];
};

export default function IndeterminateCheckbox() {
  const data: Department[] = [
    {
      department: "customer_service",
      sub_departments: ["support", "customer_success"],
    },
    {
      department: "design",
      sub_departments: ["graphic_design", "product_design", "web_design"],
    },
  ];

  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleExpandClick = (deptIndex: number) => () => {
    setExpanded(expanded === deptIndex ? false : deptIndex);
  };

  const initialChecked: boolean[] = Array.from(
    { length: data.length },
    () => false
  );

  const initialSubDeptChecked: boolean[][] = data.map((dept) =>
    Array.from({ length: dept.sub_departments.length }, () => false)
  );

  const [deptChecked, setDeptChecked] = useState<boolean[]>(initialChecked);
  const [subDeptChecked, setSubDeptChecked] = useState<boolean[][]>(
    initialSubDeptChecked
  );

  const handleDeptChange =
    (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDeptChecked = [...deptChecked];
      newDeptChecked[index] = event.target.checked;
      setDeptChecked(newDeptChecked);

      if (event.target.checked) {
        const newSubDeptChecked = [...subDeptChecked];
        newSubDeptChecked[index] = newSubDeptChecked[index].map(() => true);
        setSubDeptChecked(newSubDeptChecked);
      }
    };

  const handleSubDeptChange =
    (deptIndex: number, subDeptIndex: number) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newSubDeptChecked = [...subDeptChecked];
      newSubDeptChecked[deptIndex][subDeptIndex] = event.target.checked;
      setSubDeptChecked(newSubDeptChecked);

      if (newSubDeptChecked[deptIndex].every((subDept) => !subDept)) {
        const newDeptChecked = [...deptChecked];
        newDeptChecked[deptIndex] = false;
        setDeptChecked(newDeptChecked);
      } else if (
        newSubDeptChecked[deptIndex].some((subDept) => subDept) &&
        !deptChecked[deptIndex]
      ) {
        const newDeptChecked = [...deptChecked];
        newDeptChecked[deptIndex] = true;
        setDeptChecked(newDeptChecked);
      }
    };

  return (
    <div>
      {data.map((dept, deptIndex) => (
        <Accordion
          style={{ backgroundColor: "#444", marginBottom: "8px" }}
          key={dept.department}
          expanded={expanded === deptIndex}
          onChange={handleExpandClick(deptIndex)}
        >
          <AccordionSummary
            expandIcon={
              <div onClick={(e) => e.stopPropagation()}>
                <ExpandMoreIcon />
              </div>
            }
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              checked={deptChecked[deptIndex]}
              onChange={handleDeptChange(deptIndex)}
              color="primary"
            />
            <Typography variant="h6" component="div">
              {dept.department}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
              {dept.sub_departments.map((subDept, subDeptIndex) => (
                <div key={subDept}>
                  <Checkbox
                    checked={subDeptChecked[deptIndex][subDeptIndex]}
                    onChange={handleSubDeptChange(deptIndex, subDeptIndex)}
                    color="primary"
                  />
                  <Typography>{subDept}</Typography>
                </div>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
