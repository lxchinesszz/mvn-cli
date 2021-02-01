import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;

/**
 * @author jmvn-cli
 **/
@TableName(value = "demand_plan", autoResultMap = true)
public class DemandPlanDO implements Serializable {

    private static final long serialVersionUID = 1L;
    
   /**
    * 
    **/
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    public Long id;
    
   /**
    * demandPlan单号
    **/
    public String demandPlanOrderCode;
    
   /**
    * demandPlan名称
    **/
    public String demandPlanName;
    
   /**
    * 创建人
    **/
    public Long creatorId;
    
   /**
    * 
    **/
    public Long modifierId;
    
   /**
    * 品牌组ID
    **/
    public Long brandGroupId;
    
   /**
    * 品牌的code
    **/
    public String brandCode;
    
   /**
    * 品牌id
    **/
    public Long purchaseBrandId;
    
   /**
    * 上版采购计划id
    **/
    public Long prePurchasePlanId;
    
   /**
    * 最新采购计划id
    **/
    public Long latestPurchasePlanId;
    
   /**
    * 上版销售预估id
    **/
    public Long preSalesEstimateId;
    
   /**
    * 最新销售预估
    **/
    public Long latestSalesEstimateId;
    
   /**
    * 生成月份
    **/
    public Date gmtCreate;
    
   /**
    * 
    **/
    public Date gmtModify;
    
   /**
    * 
    **/
    public Integer delFlag;
    
   
   /**
    * @param id 
    **/
    public void setId(Long id){
        this.id = id;
    }

   /**
    * @return Long 
    **/
    public Long getId(){
        return id
    }
   
   /**
    * @param demandPlanOrderCode demandPlan单号
    **/
    public void setDemandPlanOrderCode(String demandPlanOrderCode){
        this.demandPlanOrderCode = demandPlanOrderCode;
    }

   /**
    * @return String demandPlan单号
    **/
    public String getDemandPlanOrderCode(){
        return demandPlanOrderCode
    }
   
   /**
    * @param demandPlanName demandPlan名称
    **/
    public void setDemandPlanName(String demandPlanName){
        this.demandPlanName = demandPlanName;
    }

   /**
    * @return String demandPlan名称
    **/
    public String getDemandPlanName(){
        return demandPlanName
    }
   
   /**
    * @param creatorId 创建人
    **/
    public void setCreatorId(Long creatorId){
        this.creatorId = creatorId;
    }

   /**
    * @return Long 创建人
    **/
    public Long getCreatorId(){
        return creatorId
    }
   
   /**
    * @param modifierId 
    **/
    public void setModifierId(Long modifierId){
        this.modifierId = modifierId;
    }

   /**
    * @return Long 
    **/
    public Long getModifierId(){
        return modifierId
    }
   
   /**
    * @param brandGroupId 品牌组ID
    **/
    public void setBrandGroupId(Long brandGroupId){
        this.brandGroupId = brandGroupId;
    }

   /**
    * @return Long 品牌组ID
    **/
    public Long getBrandGroupId(){
        return brandGroupId
    }
   
   /**
    * @param brandCode 品牌的code
    **/
    public void setBrandCode(String brandCode){
        this.brandCode = brandCode;
    }

   /**
    * @return String 品牌的code
    **/
    public String getBrandCode(){
        return brandCode
    }
   
   /**
    * @param purchaseBrandId 品牌id
    **/
    public void setPurchaseBrandId(Long purchaseBrandId){
        this.purchaseBrandId = purchaseBrandId;
    }

   /**
    * @return Long 品牌id
    **/
    public Long getPurchaseBrandId(){
        return purchaseBrandId
    }
   
   /**
    * @param prePurchasePlanId 上版采购计划id
    **/
    public void setPrePurchasePlanId(Long prePurchasePlanId){
        this.prePurchasePlanId = prePurchasePlanId;
    }

   /**
    * @return Long 上版采购计划id
    **/
    public Long getPrePurchasePlanId(){
        return prePurchasePlanId
    }
   
   /**
    * @param latestPurchasePlanId 最新采购计划id
    **/
    public void setLatestPurchasePlanId(Long latestPurchasePlanId){
        this.latestPurchasePlanId = latestPurchasePlanId;
    }

   /**
    * @return Long 最新采购计划id
    **/
    public Long getLatestPurchasePlanId(){
        return latestPurchasePlanId
    }
   
   /**
    * @param preSalesEstimateId 上版销售预估id
    **/
    public void setPreSalesEstimateId(Long preSalesEstimateId){
        this.preSalesEstimateId = preSalesEstimateId;
    }

   /**
    * @return Long 上版销售预估id
    **/
    public Long getPreSalesEstimateId(){
        return preSalesEstimateId
    }
   
   /**
    * @param latestSalesEstimateId 最新销售预估
    **/
    public void setLatestSalesEstimateId(Long latestSalesEstimateId){
        this.latestSalesEstimateId = latestSalesEstimateId;
    }

   /**
    * @return Long 最新销售预估
    **/
    public Long getLatestSalesEstimateId(){
        return latestSalesEstimateId
    }
   
   /**
    * @param gmtCreate 生成月份
    **/
    public void setGmtCreate(Date gmtCreate){
        this.gmtCreate = gmtCreate;
    }

   /**
    * @return Date 生成月份
    **/
    public Date getGmtCreate(){
        return gmtCreate
    }
   
   /**
    * @param gmtModify 
    **/
    public void setGmtModify(Date gmtModify){
        this.gmtModify = gmtModify;
    }

   /**
    * @return Date 
    **/
    public Date getGmtModify(){
        return gmtModify
    }
   
   /**
    * @param delFlag 
    **/
    public void setDelFlag(Integer delFlag){
        this.delFlag = delFlag;
    }

   /**
    * @return Integer 
    **/
    public Integer getDelFlag(){
        return delFlag
    }
   
    @Override
    public String toString() {
        return "DemandPlanDO{" +
          ",id=" + this.id + 
          ",demandPlanOrderCode=" + this.demandPlanOrderCode + 
          ",demandPlanName=" + this.demandPlanName + 
          ",creatorId=" + this.creatorId + 
          ",modifierId=" + this.modifierId + 
          ",brandGroupId=" + this.brandGroupId + 
          ",brandCode=" + this.brandCode + 
          ",purchaseBrandId=" + this.purchaseBrandId + 
          ",prePurchasePlanId=" + this.prePurchasePlanId + 
          ",latestPurchasePlanId=" + this.latestPurchasePlanId + 
          ",preSalesEstimateId=" + this.preSalesEstimateId + 
          ",latestSalesEstimateId=" + this.latestSalesEstimateId + 
          ",gmtCreate=" + this.gmtCreate + 
          ",gmtModify=" + this.gmtModify + 
          ",delFlag=" + this.delFlag + 
        "}"
    }
}
