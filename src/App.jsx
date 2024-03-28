import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterValidation = Yup.object().shape({
  Name: Yup.string().min(3, "Bu alani doldur!").required("Bu alani doldur!"),
  email: Yup.string().email("Emaili duzgun yaz").required("Mutleq doldurun!"),
  age: Yup.number().min(18, "Get Boyuyende Gelersen!").required(),
  password: Yup.string().required("Mutleq password girin!"),
});

const App = () => {
  // Özel bir hata toastı gösterme fonksiyonu
  const showErrorsAsToast = (errors) => {
    Object.values(errors).forEach(error => {
      toast.error(error);
    });
  };

  return (
    <div>
      <h1>This is my Calculator Project</h1>
      <Formik
        initialValues={{
          Name: '',
          email: '',
          age: 0,
          password: '',
        }}
        validationSchema={RegisterValidation}
        onSubmit={(values, { setSubmitting, errors }) => {
          // Form başarıyla gönderildiğinde
          console.log(errors);
          toast.success("Gönderildi!");
          setSubmitting(false);
        }}
      >
        {({ errors, isValid, isSubmitting }) => (
          <Form>
            <Field type="text" name="Name" />
            {/* {errors.Name && touched.Name && <div style={{ color: "red" }}>{errors.Name}</div>} */}
            <Field type="email" name="email" />
            {/* {errors.email && touched.email && <div style={{ color: "red" }}>{errors.email}</div>} */}
            <Field type="number" name="age" />
            {/* {errors.age && touched.age && <div style={{ color: "red" }}>{errors.age}</div>} */}
            <Field type="password" name="password" />
            {/* {errors.password && touched.password && <div style={{ color: "red" }}>{errors.password}</div>} */}
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={(e) => {
                if (!isValid) {
                  e.preventDefault();
                  showErrorsAsToast(errors);
                }
                // handleSubmit();
              }}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default App;
