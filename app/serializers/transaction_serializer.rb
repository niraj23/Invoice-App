class TransactionSerializer < ActiveModel::Serializer
    attributes :id, :item, :price
    has_one :user
  end
  