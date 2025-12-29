import SettingButtonDesc from "../../components/SettingButtonDesc"

const PrivacySettingsScreen = () => {
  return (
    <div>
      <SettingButtonDesc
        title="Read Receipts"
        description="If turned off, you won't send or receive read receipts. Read receipts are always sent for group chats."
        settingtoggle={() => {}} // TODO for future me: zustand read recipts toggle
      />
    </div>
  )
}

export default PrivacySettingsScreen
