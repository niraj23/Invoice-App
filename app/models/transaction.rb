class Transaction < ApplicationRecord
    belongs_to :user
  
    validates :item, presence: true
    validates :price, presence: true
  end
  