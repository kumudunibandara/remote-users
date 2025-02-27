import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';

const ActionsRenderer = (props: any) => {
    const theme = useTheme();
    const { onEdit, onDelete, data } = props;

    const handleEdit = () => {
        onEdit(data);
    };

    const handleDelete = () => {
        onDelete(data);
    };

    return (
        <>
            <IconButton onClick={handleEdit} size="small" sx={{ color: theme.palette.primary.main }}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete} size="small" sx={{ color: theme.palette.error.main }}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};

export default ActionsRenderer;
