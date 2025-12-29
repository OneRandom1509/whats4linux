import React from "react"
import EmojiPicker, { Theme } from "emoji-picker-react"

interface ChatInputProps {
  inputText: string
  pastedImage: string | null
  selectedFile: File | null
  selectedFileType: string
  showEmojiPicker: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  fileInputRef: React.RefObject<HTMLInputElement | null>
  emojiPickerRef: React.RefObject<HTMLDivElement | null>
  emojiButtonRef: React.RefObject<HTMLButtonElement | null>
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onPaste: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void
  onSendMessage: () => void
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveFile: () => void
  onEmojiClick: (emojiData: { emoji: string }) => void
  onToggleEmojiPicker: () => void
}

export function ChatInput({
  inputText,
  pastedImage,
  selectedFile,
  selectedFileType,
  showEmojiPicker,
  textareaRef,
  fileInputRef,
  emojiPickerRef,
  emojiButtonRef,
  onInputChange,
  onKeyDown,
  onPaste,
  onSendMessage,
  onFileSelect,
  onRemoveFile,
  onEmojiClick,
  onToggleEmojiPicker,
}: ChatInputProps) {
  return (
    <div className="relative p-3 bg-light-secondary dark:bg-[#202c33]">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="absolute bottom-20 left-4 z-50">
          <EmojiPicker onEmojiClick={onEmojiClick} theme={Theme.AUTO} />
        </div>
      )}

      {/* Pasted Image Preview */}
      {pastedImage && (
        <div className="mb-2 relative inline-block">
          <img src={pastedImage} alt="Pasted" className="max-h-40 rounded-lg" />
          <button
            onClick={onRemoveFile}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      {/* Selected File Preview */}
      {selectedFile && (
        <div className="mb-2 flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {selectedFileType === "image" && "📷"}
              {selectedFileType === "video" && "🎥"}
              {selectedFileType === "audio" && "🎵"}
              {selectedFileType === "document" && "📄"}
              <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                {selectedFile.name}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </span>
          </div>
          <button
            onClick={onRemoveFile}
            className="text-red-500 hover:text-red-600 p-1"
            title="Remove file"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        {/* Emoji Button */}
        <button
          ref={emojiButtonRef}
          onClick={onToggleEmojiPicker}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          title="Emoji"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-current text-gray-600 dark:text-gray-400"
          >
            <path d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path>
          </svg>
        </button>

        {/* Attach File Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
          title="Attach file"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="fill-current text-gray-600 dark:text-gray-400"
          >
            <path d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"></path>
          </svg>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={onFileSelect}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
        />

        {/* Text Input */}
        <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg">
          <textarea
            ref={textareaRef}
            value={inputText}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            placeholder="Type a message"
            className="w-full p-2 bg-transparent resize-none outline-none text-gray-900 dark:text-white max-h-32"
            rows={1}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={onSendMessage}
          className="p-2 bg-green-500 hover:bg-green-600 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!inputText.trim() && !pastedImage && !selectedFile}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
