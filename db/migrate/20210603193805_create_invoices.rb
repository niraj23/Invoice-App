class CreateInvoices < ActiveRecord::Migration[6.1]
  def change
    create_table :invoices do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :description
      t.string :client_name
      t.string :client_email
      t.string :status
      t.datetime :due_date
      t.string :logo
      t.string :item
      t.integer :price
      t.timestamps
    end
  end
end
