class ApplicationRecord < ActiveRecord::Base
  self.inheritance_column = 'kind'
  self.abstract_class = true

  before_validation :nullify_attributes

  def self.easy_association_assign(*columns, create_column: :name)
    columns.each do |column|
      define_method("#{column}=") do |value|
        reflection = self.class._reflections[column.to_s]
        klass = reflection.klass

        value = Array.wrap(value).map do |item|
          case item
            when String             then klass.new({ create_column => item })
            when Numeric            then klass.find(item)
            when ActiveRecord::Base then item
          end
        end

        super(reflection.collection? ? value : value.first)
      end
    end
  end

  # Monkey patching due to one bug just found on my gem
  def update_column(column, value)
    return super if persisted?
    write_attribute(column, value)
  end

  private

    def nullify_attributes
      attributes.each do |column, value|
        write_attribute(column, nil) if value.respond_to?(:blank?) &&
          value.blank? && !value.eql?(false) && !value.nil?
      end
    end
end
