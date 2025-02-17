import React, {useCallback} from 'react';
import {observer} from 'mobx-react-lite';
import {styled} from '@mui/material';
import {useAppContext} from '../../context';
import Form from '../../components/Form/Form';

const CardContainer = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #8080805e',
    width: '20vw',
    borderRadius: '5px',
});
const FileCard = observer(() => {
    const {fileController, fileStore} = useAppContext();

    const handleFormSubmit = useCallback(async (formData: { [key: string]: any }) => {
        await fileController.uploadFile(formData);
        // eslint-disable-next-line
    }, [])

    return (
        <CardContainer>
            <Form
                loading={fileStore.isLoading()}
                handleSubmit={(formData) => handleFormSubmit(formData)}
                fields={[
                    {
                        fieldName: 'retentionTime',
                        title: 'Expiration time',
                        validate: (val: string) => Boolean(Number(val) && Number(val) > 0),
                        type: 'tel',
                        placeholder: '1[minute]',
                    },

                    {
                        fieldName: 'newImage',
                        title: 'New image',
                        validate: (val: File) => val.size > 0 && val.name.length > 0,
                        type: 'dragAndDrop',
                    },
                ]}
            />
        </CardContainer>
    );
});
export default FileCard;
