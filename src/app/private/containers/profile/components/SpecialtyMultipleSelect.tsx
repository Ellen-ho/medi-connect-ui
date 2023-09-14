import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ControllerRenderProps } from 'react-hook-form';
import { IDoctorForm } from '../pages/DoctorProfileDetail';
import { MedicalSpecialtyType } from '../../../../../types/Share';

const specialties = Object.values(MedicalSpecialtyType);

interface ISpecialtyMultipleSelectProps {
  field: ControllerRenderProps<IDoctorForm, 'specialties'>;
}

const SpecialtyMultipleSelect: React.FC<ISpecialtyMultipleSelectProps> = ({
  field,
}) => {
  return (
    <FormControl>
      <InputLabel>Specialties</InputLabel>
      <Select {...field} label="specialties" multiple>
        {specialties.map((specialty) => (
          <MenuItem value={specialty} key={specialty}>
            {specialty}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SpecialtyMultipleSelect;
