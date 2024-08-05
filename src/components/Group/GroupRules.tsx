import { IonModal, IonHeader, IonToolbar, IonText, IonButton, IonContent, IonList, IonItem, IonLabel } from '@ionic/react'
import { GroupRuleType } from '../../types'
import { useRef } from 'react';

const GroupRules = (props: {
  rules: GroupRuleType[]
}) => {
  const modal = useRef<HTMLIonModalElement>(null);

  return (
    <IonModal
      ref={modal}
      trigger="group_rules"
      initialBreakpoint={0.75}
      breakpoints={[0, 0.75, 1]}
    >
      <IonHeader collapse="condense" className="px-4">
        <IonToolbar>
          <IonText className="font-poppins font-bold text-xl">
            Rules from the admins
          </IonText>
          <IonButton
            slot="end"
            fill="clear"
            onClick={() => modal.current?.dismiss()}
          >
            OK
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className='rounded-xl'>
          {props.rules.map((rule, i) => (
            <IonItem>
              <IonLabel>
                <h3>{rule.title}</h3>
                <p>{rule.description}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  )
}

export default GroupRules