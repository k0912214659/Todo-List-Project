import React, { memo } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

function CheckBox(checkBoxProps) {
  return (
    <Checkbox {...checkBoxProps} />
  );
}

export default memo(CheckBox);
