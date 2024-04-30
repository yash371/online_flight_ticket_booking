import React from 'react'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { ScrollView } from 'react-native'

const ios=Platform.OS == 'ios';
const CustomKeyboardView = ({children,inChat=false}) => {
  let kavConfig={};
  let scrollViewConfig={};
  if(inChat){
    kavConfig={keyboardVerticalOffset:90}
    scrollViewConfig={contentContainerStyle:{flex:1}}
  }
  return (
    <KeyboardAvoidingView
    behavior={ios? 'padding':'height'}
    style={{flex:1}}
   {...kavConfig}
    >
        <ScrollView
        style={{flex:1}}
        bounces={false}
        showsVerticalScrollIndicator={false}
        {...scrollViewConfig}
        >
            {
                children
            }
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default CustomKeyboardView
