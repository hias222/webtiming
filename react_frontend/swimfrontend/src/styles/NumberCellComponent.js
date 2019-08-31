
import { styled } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';

const MyTableCell = styled(TableCell)({
  background: 'red',
  fontSize: '1em',
  textAlign: 'center',
  border: 0,
  color: 'white',
  width: 5,
  padding: '0 30px',
});

export default MyTableCell