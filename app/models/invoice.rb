class Invoice < ApplicationRecord
  belongs_to :user
  # has_many :transactions, dependent: :destroy

  validates :description, presence: true
  validates :client_name, presence: true
  validates :client_email, presence: true
  validates :due_date, presence: true
  validates :logo, presence: true
  validates :status, presence: true
end
