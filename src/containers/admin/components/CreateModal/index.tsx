import { Modal } from 'antd';
import React from 'react';
import { configDataType, DynamicForm, FormStyle } from '../DynamicForm';
export interface CreateModalProps {
    visible: boolean;
    title: string;
    modalConfData: configDataType[];
    modalStyle?: FormStyle;
    modalItemStyle?: FormStyle;
    // eslint-disable-next-line
    addService: Function;
    // eslint-disable-next-line
    onCancelModal: Function;
}
const CreateModal: React.FC<CreateModalProps> = props => {
    const { visible, title, modalConfData, modalStyle, modalItemStyle, addService, onCancelModal } =
        props;
    return (
        <Modal title={title} open={visible} onCancel={() => onCancelModal(!visible)} footer={null}>
            <DynamicForm
                configData={modalConfData}
                formStyle={modalStyle} //form样式
                formItemStyle={modalItemStyle} //formitem样式
                addOrModifyOrSearchService={addService}
                buttonName='添加'
                initialData={undefined}
                setDrawerVisible={undefined}
                formLayout={'horizontal'}
            />
        </Modal>
    );
};

export default CreateModal;
