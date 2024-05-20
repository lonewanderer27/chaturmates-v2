import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { FC, useState } from 'react'
import { IonButton, IonCheckbox, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonInput, IonPage, IonProgressBar, IonSelect, IonSelectOption, IonText, createAnimation } from '@ionic/react';
import { enrollmentcertSurveyType, yearLevel } from '../../atoms/survey_enrollmentcert';
import { mixed, object, string } from 'yup';
import { useAtom, useAtomValue } from 'jotai';

import { RouteComponentProps } from 'react-router';
import { chevronBackOutline } from 'ionicons/icons';
import { yupResolver } from '@hookform/resolvers/yup';

const studentNumberSchema = object().shape({ studentNumber: string().required().matches(/^[0-9]+$/, "Must be only digits").min(9).max(9).label("Student No.") })
const aduEmailSchema = object().shape({ aduEmail: string().required().matches(/^[a-zA-Z0-9._%+-]+@adamson\.edu\.ph$/, "Must be an Adamson Email").label("Adamson Email") });
const yearLevelSchema = object().shape({ yearLevel: string().required().oneOf(Object.values(yearLevel)).label("Year Level") });
const gcashNumberSchema = object().shape({ gcashNumber: string().required().matches(/^[0-9]+$/, "Must be only digits").min(11).max(11).label("GCash Number") });
const enrollmentCertPDFSchema = object().shape({ enrollmentCertPDF: mixed().required().label("Enrollment Certificate PDF") });
const agreeToTermsSchema = object().shape({ agreeToTerms: mixed().required().oneOf([true], "You must agree to the terms and conditions").label("Terms and Conditions") });
const numOfFields = 6;
const schema = studentNumberSchema.concat(aduEmailSchema).concat(yearLevelSchema).concat(gcashNumberSchema).concat(enrollmentCertPDFSchema).concat(agreeToTermsSchema);

const EnrollmentCert: FC<RouteComponentProps> = () => {
  const [progress, setProgress] = useState(() => 0);
  console.log("Number of Fields: ", numOfFields);
  console.log("Progress: ", progress);

  const { handleSubmit, control, setError, getValues, clearErrors } = useForm({
    resolver: yupResolver(schema),
  })

  const handleNext = async () => {
    const values = getValues(); // get current form values

    // validate current field
    switch (progress) {
      case 1: {
        studentNumberSchema.validate({ studentNumber: values.studentNumber }).then(() => {
          setProgress(p => p + 1);
        }).catch((err) => {
          setError('studentNumber', {
            type: 'manual',
            message: err.errors[0]
          })
        });
      }; break;
      case 2: {
        aduEmailSchema.validate({ aduEmail: values.aduEmail }).then(() => {
          setProgress(p => p + 1);
        }).catch((err) => {
          setError('aduEmail', {
            type: 'manual',
            message: err.errors[0]
          })
        });
      }; break;
      case 3: {
        yearLevelSchema.validate({ yearLevel: values.yearLevel }).then(() => {
          setProgress(p => p + 1);
        }).catch((err) => {
          setError('yearLevel', {
            type: 'manual',
            message: err.errors[0]
          })
        });
      }; break;
      case 5: {
        gcashNumberSchema.validate({ gcashNumber: values.gcashNumber }).then(() => {
          setProgress(p => p + 1);
        }).catch((err) => {
          setError('gcashNumber', {
            type: 'manual',
            message: err.errors[0]
          })
        });
      }; break;
      case 4: {
        enrollmentCertPDFSchema.validate({ enrollmentCertPDF: values.enrollmentCertPDF }).then(() => {
          setProgress(p => p + 1);
        }).catch((err) => {
          setError('enrollmentCertPDF', {
            type: 'manual',
            message: err.errors[0]
          })
        });
      }; break;
      case 6: {
        agreeToTermsSchema.validate({ agreeToTerms: values.agreeToTerms }).then(() => {
          // submit form

        }).catch((err) => {
          setError('agreeToTerms', {
            type: 'manual',
            message: err.errors[0]
          })
        });
      }; break;
      default: {
        setProgress(p => p + 1);
      }
    }
  };

  const handleSave: SubmitHandler<enrollmentcertSurveyType> = (data) => {
    console.log(data);
  }

  const openFileDialog = () => {
    (document as any).getElementById("enrollmentCertPDF").click();
  };

  const handleBack = () => {
    // clear errors
    clearErrors();

    console.log('Back');
    setProgress(progress - 1);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonProgressBar value={progress / numOfFields}></IonProgressBar>
      </IonHeader>
      <IonContent fullscreen>
        <form className='flex flex-col items-center justify-center h-full p-6'>
          <div className='w-full'>
            {progress == 1 &&
              <Controller
                name="studentNumber"
                control={control}
                render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                  <IonInput
                    className={`${error && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    value={value}
                    onIonBlur={onBlur}
                    onIonChange={onChange}
                    label="Student Number"
                    labelPlacement="stacked"
                    placeholder='Enter your Student Number'
                    errorText={error?.message}
                  />
                )}
              />}
            {progress == 2 &&
              <Controller
                name="aduEmail"
                control={control} render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                  <IonInput
                    className={`${error && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    value={value}
                    onIonBlur={onBlur}
                    onIonChange={onChange}
                    label="Adamson Email"
                    labelPlacement="stacked"
                    placeholder='Enter your Adamson Email'
                    errorText={error?.message}
                  />
                )} />}
            {progress == 3 &&
              <Controller
                name="yearLevel"
                control={control}
                render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                  <>
                    <IonSelect
                      className={`${error && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                      value={value}
                      onIonChange={onChange}
                      placeholder="Select Year Level"
                      label="Year Level"
                      labelPlacement="stacked"
                    >
                      {Object.values(yearLevel).map((year) => (
                        <IonSelectOption key={year} value={year}>{year}</IonSelectOption>
                      ))}
                    </IonSelect>
                    <div>
                      {error && <IonText color="danger" className='text-xs'>{error.message}</IonText>}
                    </div>
                  </>
                )}
              />}
            {progress === 5 &&
              <Controller
                name="gcashNumber"
                control={control}
                render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                  <IonInput
                    className={`${error && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                    value={value}
                    onIonBlur={onBlur}
                    onIonChange={onChange}
                    label="GCash Number"
                    labelPlacement="stacked"
                    placeholder='Enter your GCash Number'
                    errorText={error?.message}
                  />
                )}
              />}
            {progress === 4 && (
              <Controller
                name="enrollmentCertPDF"
                control={control}
                render={({ field: { value, onChange, onBlur }, fieldState: { error, isTouched } }) => (
                  <div className='w-full'>
                    <label htmlFor="enrollmentCertPDF">Upload your Enrollment Certificate PDF</label>
                    <input
                      type="file"
                      id="enrollmentCertPDF"
                      accept=".pdf"
                      onBlur={onBlur}
                      className={`hidden ${error && 'ion-invalid'} ${isTouched && 'ion-touched'}`}
                      onChange={(e) => {
                        onChange(e.target.files ? [0] : null);
                      }}
                    />
                    <IonButton onClick={openFileDialog} size="small" expand='block' className='mt-2' fill="outline">
                      <IonText className='p-4'>
                        {value ? 'Change File' : 'Choose File'}
                      </IonText>
                    </IonButton>
                    {error && <IonText color="danger" className='text-xs'>{error.message}</IonText>}
                  </div>
                )}
              />
            )}
            {progress === 6 && (
              <Controller
                name="agreeToTerms"
                control={control}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => {
                  console.log(value);
                  return (
                    <div className='w-full'>
                      <div className='flex align-middle'>
                        <IonCheckbox
                          checked={value ? true : false}
                          onIonChange={(e) => {
                            e.detail.checked ? onChange(true) : onChange(null);
                          }}
                          color="primary"
                        />
                        <IonText className='text-sm ml-2'>I agree to the terms and conditions</IonText><br />
                      </div>
                      {error && <IonText color="danger" className='text-xs'>{error.message}</IonText>}
                    </div>
                  )
                }}
              />
            )}
            <div className='flex justify-end mt-5'>
              <IonButton size="small" onClick={handleNext}>
                <IonText className='p-2'>
                  {progress === numOfFields ? 'Submit' : 'OK'}
                </IonText>
              </IonButton>
            </div>
          </div>
        </form>
      </IonContent>
      <IonFooter className='p-4'>
        {progress > 0 && <IonGrid>
          <IonCol size='2'>
            <IonButton onClick={handleBack} size='small'>
              <IonIcon className='py-1' src={chevronBackOutline}></IonIcon>
            </IonButton>
          </IonCol>
          <IonCol size="8">
            <IonButton onClick={handleNext} className="w-64 ml-3" size='small'>
              <IonText className='p-2'>
                {progress === numOfFields ? 'Submit' : 'Next'}
              </IonText>
            </IonButton>
          </IonCol>
        </IonGrid>}
        {progress == 0 && <IonGrid>
          <IonButton onClick={handleNext} expand="block" size="small">
            <IonText className='p-2'>Next</IonText>
          </IonButton>
        </IonGrid>}
      </IonFooter>
    </IonPage>
  )
}

export default EnrollmentCert;