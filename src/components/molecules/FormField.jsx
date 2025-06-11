import React from 'react';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

const FormField = ({ label, id, type = 'text', value, onChange, placeholder, required = false, children, ...props }) => {
    return (
        <div>
            <Label htmlFor={id}>
                {label} {required && '*'}
            </Label>
            {type === 'textarea' ? (
                <textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    rows={props.rows || 3}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder={placeholder}
                    required={required}
                    {...props}
                />
            ) : type === 'select' ? (
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required={required}
                    {...props}
                >
                    {children}
                </select>
            ) : (
                <Input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    {...props}
                />
            )}
        </div>
    );
};

export default FormField;