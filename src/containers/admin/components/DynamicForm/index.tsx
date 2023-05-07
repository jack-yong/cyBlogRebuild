import { useThrottleFn } from 'ahooks';
import { Button, Form, Input, Select, DatePicker, Tag, ColProps } from 'antd';
import { Rule } from 'antd/lib/form';
import { FormLayout } from 'antd/lib/form/Form';
import { FormLabelAlign } from 'antd/lib/form/interface';
import { DefaultOptionType } from 'antd/lib/select';
import moment from 'moment';
import React, { useEffect } from 'react';
import { ColorPicker } from '../ColorPicker';
export interface DFProps {
    configData: configDataType[];
    // eslint-disable-next-line
    initialData: any;
    formStyle?: FormStyle;
    formItemStyle?: FormStyle;
    buttonName: string;
    // eslint-disable-next-line
    addOrModifyOrSearchService: Function;
    // eslint-disable-next-line
    setDrawerVisible?: Function;
    formLayout: FormLayout;
    // eslint-disable-next-line
    defalutform?: any;
}

export interface configDataType {
    name: string;
    list?: DefaultOptionType[];
    type: elementType;
    label: string;
    placeholder?: string;
    disabled?: boolean;
    rules?: Rule[];
}

export interface FormStyle {
    labelAlign?: FormLabelAlign;
    labelWrap?: boolean;
    labelCol?: ColProps;
    wrapperCol?: ColProps;
}

// export interface CustomTagProps {
//     key: string | number,
//     label: string,
//     value: string,
//     closable: boolean,
//     onClose: any,
// }

export enum elementType {
    'input' = 1,
    'select',
    'multipleSelect',
    'datePicker',
    'rangePicker',
    'textarea',
    'colorInput'
}

export const DynamicForm: React.FC<DFProps> = ({
    defalutform,
    configData,
    initialData,
    formStyle,
    formItemStyle,
    buttonName,
    addOrModifyOrSearchService,
    setDrawerVisible,
    formLayout
}) => {
    const form = defalutform || Form.useForm()[0];

    useEffect(() => {
        if (form) {
            form.resetFields();
        }
    }, [initialData, form]);

    // let tagOptions: DefaultOptionType[] | undefined;

    const throttledSubmit = useThrottleFn(
        async () => {
            //eslint-disable-next-line
            let fields: any = null;
            try {
                fields = await form.validateFields();
                Object.keys(fields).forEach(key => {
                    if (fields[key] === undefined || fields[key] === '') {
                        delete fields[key];
                    }
                });
            } catch (err) {
                return;
            }
            // console.log("fields", fields);
            await addOrModifyOrSearchService(fields);
            // setRefresh((val) => val + 1); //刷新页面
            if (buttonName !== '搜索') {
                form.resetFields();
            }

            setDrawerVisible && setDrawerVisible(false);

            // form.resetFields();
            // message.success(`${buttonName}成功`);
        },
        { wait: 300 }
    );

    //图标渲染的函数
    // eslint-disable-next-line
    const tagRender = (props: any) => {
        // eslint-disable-next-line react/prop-types
        const { value, label, closable, onClose } = props;
        // const tagItem = tagOptions?.find(item => item.value === value);

        const onPreventMouseDown = (event: {
            preventDefault: () => void;
            stopPropagation: () => void;
        }) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={value}
                key={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{
                    marginRight: 3
                }}
            >
                {label}
            </Tag>
        );
    };

    const createFormItem = () => {
        const formItemList = [];
        // console.log(configData, "configDataconfigDataconfigData111");
        configData.forEach((item: configDataType) => {
            const { name, type, label, placeholder, list, rules, disabled = false } = item;
            switch (type) {
                case elementType.input:
                    // eslint-disable-next-line no-case-declarations
                    const inputItem = (
                        <Form.Item
                            {...formItemStyle}
                            key={name}
                            name={name}
                            label={label}
                            rules={rules}
                        >
                            <Input disabled={disabled} placeholder={placeholder} allowClear />
                        </Form.Item>
                    );
                    formItemList.push(inputItem);
                    break;
                case elementType.select:
                    // eslint-disable-next-line no-case-declarations
                    const selectItem = (
                        <Form.Item
                            {...formItemStyle}
                            key={name}
                            name={name}
                            label={label}
                            rules={rules}
                        >
                            <Select
                                disabled={disabled}
                                allowClear
                                placeholder={placeholder}
                                filterOption={true}
                                // filterSort={(optionA, optionB) =>
                                //     optionA.children?.toLowerCase().localeCompare(optionB.children?.toLowerCase())
                                // }
                                style={{ minWidth: '15rem' }}
                            >
                                {list?.map((item, idx) => (
                                    <Select.Option key={idx} value={item.value}>
                                        {item.label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    );
                    formItemList.push(selectItem);
                    break;
                case elementType.multipleSelect:
                    // eslint-disable-next-line no-case-declarations
                    const multipleSelectItem = (
                        <Form.Item
                            {...formItemStyle}
                            key={name}
                            name={name}
                            label={label}
                            rules={rules}
                            style={{ minWidth: '25rem' }}
                        >
                            <Select
                                mode='multiple'
                                placeholder={placeholder}
                                showArrow
                                tagRender={tagRender}
                                options={list}
                                labelInValue={true}
                                optionFilterProp='label'
                            ></Select>
                        </Form.Item>
                    );
                    // tagOptions = list;
                    formItemList.push(multipleSelectItem);
                    break;
                case elementType.rangePicker:
                    // eslint-disable-next-line no-case-declarations
                    const rangePicker = (
                        <Form.Item
                            {...formItemStyle}
                            key={name}
                            name={name}
                            label={label}
                            rules={rules}
                        >
                            <DatePicker.RangePicker
                                ranges={{
                                    Today: [moment(), moment()],
                                    'This Month': [
                                        moment().startOf('month'),
                                        moment().endOf('month')
                                    ]
                                }}
                            />
                        </Form.Item>
                    );
                    formItemList.push(rangePicker);
                    break;
                case elementType.textarea:
                    // eslint-disable-next-line no-case-declarations
                    const textAreaItem = (
                        <Form.Item
                            {...formItemStyle}
                            key={name}
                            name={name}
                            label={label}
                            rules={rules}
                        >
                            <Input.TextArea rows={5} />
                        </Form.Item>
                    );
                    formItemList.push(textAreaItem);
                    break;
                case elementType.colorInput:
                    // eslint-disable-next-line no-case-declarations
                    const colorInput = (
                        <Form.Item
                            {...formItemStyle}
                            key={name}
                            name={name}
                            label={label}
                            rules={rules}
                        >
                            <ColorPicker />
                        </Form.Item>
                    );
                    formItemList.push(colorInput);
                    break;
                case elementType.datePicker:
                    // eslint-disable-next-line no-case-declarations
                    const datePickerItem = (
                        <Form.Item
                            {...formItemStyle}
                            key={name}
                            name={name}
                            label={label}
                            rules={rules}
                        >
                            <DatePicker showNow showTime />
                        </Form.Item>
                    );
                    formItemList.push(datePickerItem);
                    break;
                default:
                    break;
            }
        });

        const submitButton = (
            <Form.Item wrapperCol={{ offset: 10, span: 16 }} key={'addbutton'}>
                <Button
                    style={{ marginRight: '72px' }}
                    type='primary'
                    onClick={throttledSubmit.run}
                >
                    {buttonName}
                </Button>
            </Form.Item>
        );
        const resetButton = (
            <Form.Item key={'delbutton'}>
                <Button
                    type='primary'
                    ghost
                    onClick={() => {
                        form.resetFields();
                    }}
                >
                    清空筛选项
                </Button>
            </Form.Item>
        );
        formItemList.push(submitButton);
        if (buttonName === '搜索') {
            formItemList.push(resetButton);
        }
        return formItemList;
    };

    return (
        <Form
            name='Dynamic_Form'
            layout={formLayout}
            {...formStyle}
            form={form}
            initialValues={initialData}
        >
            {createFormItem()}
        </Form>
    );
};
