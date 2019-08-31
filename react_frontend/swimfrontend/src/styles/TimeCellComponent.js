
import { styled } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';

const MyTableCell = styled(TableCell)({
  fontSize: '1em',
  textAlign: 'right',
  border: 0,  
  width: 10,
  padding: '0 30px',
  color: 'white',
  //background: 'rgba(38, 110, 235, 0.241)',
});

export default MyTableCell