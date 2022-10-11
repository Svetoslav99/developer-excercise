// import React from 'react';

// import classes from './formContainer.module.scss';

// type Props = {
//     children: React.ReactNode;
// };

// const FormContainer: React.FC<Props> = ({ children }) => <>{children}</>;

// export default FormContainer;

import React from 'react';

import classes from './form.module.scss';

type Props = {
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form: React.FC<Props> = ({ children, onSubmit }) => (
    <form className={classes.container} onSubmit={onSubmit}>
        {children}
    </form>
);

export default Form;
