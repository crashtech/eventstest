class ApplicationRecord < ActiveRecord::Base
  self.inheritance_column = 'kind'
  self.abstract_class = true

  before_validation :nullify_attributes

  private

    def nullify_attributes
      attributes.each do |column, value|
        write_attribute(column, nil) if value.respond_to?(:blank?) &&
          value.blank? && !value.eql?(false) && !value.nil?
      end
    end
end
